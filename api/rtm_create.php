<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$keyword = mysqli_real_escape_string($con, trim($request->keyword));
		$backlog = mysqli_real_escape_string($con, trim($request->backlog));
		$priority = mysqli_real_escape_string($con, trim($request->priority));
		$status = mysqli_real_escape_string($con, trim($request->status));
		$sql='';
		
		$sql = "INSERT INTO `req_trace_matrix`
				(`project_id`,
				`keyword`, 
				`backlog`,
				`priority`,
				`status`) 
				VALUES (
					'{$prj_id}',
					'{$keyword}',
					'{$backlog}',
					'{$priority}',
					'{$status}'
				)";
		
		if (mysqli_query($con,$sql)) {
		 
			$authdata = [
			  'project_id' => $prj_id,	
			  'keyword' => $keyword,	
			  'backlog' => $backlog,	
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