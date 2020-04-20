<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$pb_id = mysqli_real_escape_string($con, trim($request->pb_id));
		$sb_id = mysqli_real_escape_string($con, trim($request->sb_id));
		$sb_item_id = mysqli_real_escape_string($con, trim($request->sb_item_id));
		$desc = mysqli_real_escape_string($con, trim($request->desc));
		$priority = mysqli_real_escape_string($con, trim($request->priority));
		$status = mysqli_real_escape_string($con, trim($request->status));
		$sql='';
		
		$sql = "INSERT INTO `sprint_backlog`
				(`project_id`,
				`pb_id`, 
				`sb_id`,
				`sb_item_id`,
				`sb_desc`,
				`sb_priority`,
				`sb_status`) 
				VALUES (
					'{$prj_id}',
					'{$pb_id}',
					'{$sb_id}',
					'{$sb_item_id}',
					'{$desc}',
					'{$priority}',
					'{$status}'
				)";
		
		if (mysqli_query($con,$sql)) {
		 
			$authdata = [
			  'project_id' => $prj_id,	
			  'pb_id' => $pb_id,	
			  'sb_id' => $sb_id,	
			  'sb_item_id' => $sb_item_id,	
			  'sb_desc' => $desc,	
			  'sb_priority' => $priority,	
			  'sb_status' => $status,	
			];
			echo json_encode('inserted');
		 
		}
		else
		{
		  http_response_code(404);
		}
	}
?>