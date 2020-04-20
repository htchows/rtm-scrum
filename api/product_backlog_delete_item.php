<?php

	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
	$pb_id = mysqli_real_escape_string($con, trim($request->pbid));
	
	$sql = 
	"DELETE FROM `product_backlog` WHERE `id` = '$pb_id' LIMIT 1";

	if(mysqli_query($con, $sql))
	{
		$sql = "DELETE FROM `sprint_backlog` WHERE `pb_id` = '$pb_id'";
		if(mysqli_query($con, $sql))
		{
		  http_response_code(204);
		}
	}
	else
	{
	  return http_response_code(422);
	}

?>

