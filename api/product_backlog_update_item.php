<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	// Get the posted data.
	//$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata))
	{

	  // Sanitize.
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$pb_id = mysqli_real_escape_string($con, trim($request->pb_id));
		$desc = mysqli_real_escape_string($con, trim($request->desc));
		$priority = mysqli_real_escape_string($con, trim($request->priority));
		$status = mysqli_real_escape_string($con, trim($request->status));
		$id = mysqli_real_escape_string($con, trim($request->pbid));
	  // Update.
	  $sql = "UPDATE `product_backlog` 
			  SET `project_id`='$prj_id',
				  `pb_id`='$pb_id' ,
				  `pb_desc`='$desc' ,
				  `pb_priority`='$priority' ,
				  `pb_status`='$status' 
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