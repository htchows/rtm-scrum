<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	// Get the posted data.
	//$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata))
	{

	  // Sanitize.
		$id = mysqli_real_escape_string($con, trim($request->pid));
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$user_id = mysqli_real_escape_string($con, trim($request->user_id));
		$title = mysqli_real_escape_string($con, trim($request->title));
		$desc = mysqli_real_escape_string($con, trim($request->desc));
		$status = mysqli_real_escape_string($con, trim($request->status));
		$sql='';

	  // Update.
	  $sql = "UPDATE `project` 
			  SET `project_id`='$prj_id',
				  `user_id`='$user_id' ,
				  `title`='$title' ,
				  `description`='$desc' ,
				  `status`='$status' 
		      WHERE `id`='$id' 
			  LIMIT 1";

	  if(mysqli_query($con, $sql))
	  {
		return http_response_code(204);
	  }
	  else
	  {
		return http_response_code(422);
	  }  
	}
?>