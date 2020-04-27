<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$keyword = mysqli_real_escape_string($con, trim($request->keyword));
		$priority = mysqli_real_escape_string($con, trim($request->priority));
		$status = mysqli_real_escape_string($con, trim($request->status));
		
		$sql='';
		$sql = "SELECT *
				FROM product_backlog 
				WHERE project_id = '$prj_id'
				AND (pb_desc LIKE '%$keyword%' OR pb_id LIKE '%$keyword%')";
		
		if(strlen($priority) > 0 && strlen($status)>0){
			$sql .= " AND pb_priority = '$priority'
					AND pb_status = '$status'";
		}elseif (strlen($priority) > 0){
			$sql .= " AND pb_priority = '$priority'";	
		}elseif (strlen($status) > 0){
			$sql .= " AND pb_status = '$status'";	
		}
		
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]= $row['id'];
				$i++;
			}
			echo json_encode($list);
		}
		else
		{
		  http_response_code(404);
		}
	}
?>