<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$email = mysqli_real_escape_string($con, $request);
		$sql='';
		$sql = "SELECT * FROM user where email='$email'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			if($result->num_rows > 0 )
			{
				echo json_encode("1");
			}else{
				echo json_encode("0");
			}
		}
		else
		{
		  http_response_code(404);
		}
	}
?>

