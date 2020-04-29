<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	// Get the posted data.
	//$postdata = file_get_contents("php://input");

	if(isset($postdata) && !empty($postdata))
	{

	  // Sanitize.
		$id = mysqli_real_escape_string($con, trim($request->id));
		$username = mysqli_real_escape_string($con, trim($request->username));
		$email = mysqli_real_escape_string($con, trim($request->email));
		$password = mysqli_real_escape_string($con, trim($request->password));
		
	  // Update.
	  $sql = "UPDATE `user` 
			  SET `id`='$id',
				`username`='$username',
				`email`='$email',
				`password`='$password'
			  WHERE `id`='$email'";

	  if(mysqli_query($con, $sql))
	  {
		echo json_encode("updated");
	  }
	  else
	  {
		return http_response_code(422);
	  }  
	}
?>