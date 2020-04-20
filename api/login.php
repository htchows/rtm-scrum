<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$password = mysqli_real_escape_string($con, trim($request->password));
		$email = mysqli_real_escape_string($con, trim($request->email));
		$sql='';
		$sql = "SELECT * FROM user where email='$email' and password='$password'";
		
		if($result = mysqli_query($con,$sql))
		{
			$rows = array();
			while($row = mysqli_fetch_assoc($result)){
				$rows[] = $row;
			}
			echo json_encode($rows);
		}
		else
		{
		  http_response_code(404);
		}
	}
?>