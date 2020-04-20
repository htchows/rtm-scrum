<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$id = mysqli_real_escape_string($con, trim($request));
		//$email = mysqli_real_escape_string($con, trim($request->email));
		$sql='';
		$sql = "SELECT * FROM project where user_id='$id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['pid'] = $row['id'];
				$list[$i]['project_id'] = $row['project_id'];
				$list[$i]['user_id'] = $row['user_id'];
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