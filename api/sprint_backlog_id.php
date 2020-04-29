<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, $request->prj_id);
		$sb_id = mysqli_real_escape_string($con, $request->sb_id);
		$item = mysqli_real_escape_string($con, $request->sb_item_id);
		$action = mysqli_real_escape_string($con, $request->action);
		$id = mysqli_real_escape_string($con, $request->sbid);
		
		$sql='';
		if($action == "create"){
			$sql = "SELECT * FROM sprint_backlog 
					where project_id='$prj_id' and sb_id='$sb_id' and sb_item_id='$item'";
		}
		else{
			$sql = "SELECT * FROM sprint_backlog where project_id='$prj_id' 
					and sb_id='$sb_id' and sb_item_id='$item' and id != '$id'";
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