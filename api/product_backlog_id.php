<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, $request->prj_id);
		$pb_id = mysqli_real_escape_string($con, $request->pb_id);
		$id = mysqli_real_escape_string($con, $request->pbid);
		$action = mysqli_real_escape_string($con, $request->action);
		$sql='';
		if($action == "create"){
			$sql = "SELECT * FROM product_backlog where project_id='$prj_id' and pb_id='$pb_id'";
		}
		else{
			$sql = "SELECT * FROM product_backlog where project_id='$prj_id' and pb_id='$pb_id' and id != '$id'";
		}
		
		
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			if($result->num_rows >= 1 )
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