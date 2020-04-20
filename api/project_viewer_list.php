<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$id = mysqli_real_escape_string($con, trim($request));
		$sql='';
		$sql = "SELECT project.id, project.project_id, user.username, project.title, project.description, project.status 
				FROM project 
				INNER JOIN project_viewer
				INNER JOIN user
				ON project.id = project_viewer.project_id
				AND project.user_id = user.id
				AND project_viewer.user_id = '$id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['pid'] = $row['id'];
				$list[$i]['project_id'] = $row['project_id'];
				$list[$i]['username'] = $row['username'];
				$list[$i]['title'] = $row['title'];
				$list[$i]['description'] = $row['description'];
				$list[$i]['status'] = $row['status'];
				$i++;
			}
			echo json_encode($list);
		}
		else
		{
		  http_response_code(404);
		}
	}
?>