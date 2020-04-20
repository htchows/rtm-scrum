<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$id = mysqli_real_escape_string($con, trim($request));
		$sql='';
		
		$sql = "SELECT * FROM project_viewer where project_id = '$id'";
		
		$sql = "SELECT 
				project.id, project.project_id, project.title, project.user_id,
				project.description, project.status,user.email
				FROM project 
				INNER JOIN project_viewer
				INNER JOIN user
				ON project.id = project_viewer.project_id
				AND project_viewer.user_id = user.id
				AND project.id = '$id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			if($result = mysqli_query($con,$sql))
			{
				if($result->num_rows >= 1 )
				{
					$sql='';
					$sql = "SELECT 
							project.id, project.project_id, project.title, project.user_id,
							project.description, project.status,user.email
							FROM project 
							INNER JOIN project_viewer
							INNER JOIN user
							ON project.id = project_viewer.project_id
							AND project_viewer.user_id = user.id
							AND project.id = '$id'";
					if($result = mysqli_query($con,$sql))
					{
						$i = 0;
						while($row = mysqli_fetch_assoc($result))
						{
							$list[0]['pid'] = $row['id'];
							$list[0]['project_id'] = $row['project_id'];
							$list[0]['user_id'] = $row['user_id'];
							$list[0]['title'] = $row['title'];
							$list[0]['description'] = $row['description'];
							$list[0]['status'] = $row['status'];
							if($i == 0){
								$list[0]['share'] = $row['email'];
							}
							else{
								$list[0]['share'] .= "," . $row['email'];
							}
							$i++;
						}
						echo json_encode($list);
					}
					else
					{
					  http_response_code(404);
					}	
				}
				else
				{
					$sql='';
					$sql = "SELECT * FROM project where id = '$id'";
					if($result = mysqli_query($con,$sql))
					{
						$i = 0;
						while($row = mysqli_fetch_assoc($result))
						{
							$list[0]['pid'] = $row['id'];
							$list[0]['project_id'] = $row['project_id'];
							$list[0]['user_id'] = $row['user_id'];
							$list[0]['title'] = $row['title'];
							$list[0]['description'] = $row['description'];
							$list[0]['status'] = $row['status'];
							$list[0]['share'] = "";
							$i++;
						}
						echo json_encode($list);
					}
					else
					{
					  http_response_code(404);
					}	
				}
			}
			else
			{
			  http_response_code(404);
			}
		}
		else
		{
		  http_response_code(404);
		}
	}
?>