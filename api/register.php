<?php
	require 'database.php';
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	if(isset($postdata) && !empty($postdata))
	{
	  $username = mysqli_real_escape_string($con, trim($request->username));
	  $email = mysqli_real_escape_string($con, trim($request->email));
	  $password = mysqli_real_escape_string($con, trim($request->password));
	   
	  $sql = "INSERT INTO user(username,email,password) VALUES ('{$username}','{$email}','{$password}')";
	 // echo $sql;
		if (mysqli_query($con,$sql)) {
		 
			$authdata = [
			  'username' => $username,	
			  'email' => $email,
			  'password' => $password,
			  'id'    => mysqli_insert_id($con)
			];
			echo json_encode("registered");
		 
		}
	}
?>