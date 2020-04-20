<?php

	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	$id = mysqli_real_escape_string($con, trim($request));

	$sql = "DELETE FROM `project_viewer` WHERE `project_id` ='$id'";

	if(mysqli_query($con, $sql))
	{
	  http_response_code(204);
	}
	else
	{
	  return http_response_code(422);
	}

?>

