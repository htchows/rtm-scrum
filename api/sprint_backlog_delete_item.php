<?php

	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);

	// Extract, validate and sanitize the id.
	//$id = ($_GET['id'] !== null && (int)$_GET['id'] > 0)? mysqli_real_escape_string($con, (int)$_GET['id']) : false;

	//if(!$id){return http_response_code(400);}
	$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
	$pb_id = mysqli_real_escape_string($con, trim($request->pb_id));
	$sb_id = mysqli_real_escape_string($con, trim($request->sb_id));
	$sb_item_id = mysqli_real_escape_string($con, trim($request->sb_item_id));
	$id = mysqli_real_escape_string($con, trim($request->sbid));
	// Delete.
	$sql = "DELETE FROM `sprint_backlog` 
			WHERE `id`='$id' 
			LIMIT 1";

	if(mysqli_query($con, $sql))
	{
	  http_response_code(204);
	}
	else
	{
	  return http_response_code(422);
	}

?>

