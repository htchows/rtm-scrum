<?php

	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	// Extract, validate and sanitize the id.
	//$id = ($_GET['prj_id'] !== null && (int)$_GET['prj_id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['prj_id']) : false;

	$id = mysqli_real_escape_string($con, trim($request));
	
	//if(!$id)
	//{
	//  return http_response_code(400);
	//}

	// Delete.
	$sql = "DELETE FROM `req_trace_matrix` WHERE `id` ='$id' LIMIT 1";

	if(mysqli_query($con, $sql))
	{
	  http_response_code(204);
	}
	else
	{
	  return http_response_code(422);
	}

?>

