<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$user_id = mysqli_real_escape_string($con, trim($request->user_id));
		$title = mysqli_real_escape_string($con, trim($request->title));
		$desc = mysqli_real_escape_string($con, trim($request->desc));
		$status = mysqli_real_escape_string($con, trim($request->status));
		$sql='';
		
		$sql = "INSERT INTO `project`
				(`project_id`, `user_id`, `title`, `description`, `status`) 
				VALUES (
					'{$prj_id}',
					'{$user_id}',
					'{$title}',
					'{$desc}',
					'{$status}'
				)";
		
		if (mysqli_query($con,$sql)) {
		
			echo json_encode('inserted');
		 
		}
		else
		{
		  http_response_code(404);
		}
	}
?>