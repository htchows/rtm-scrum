<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$id = mysqli_real_escape_string($con, $request);
		$sql='';
		$sql = "SELECT * FROM req_trace_matrix where project_id='$id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['id'] = $row['id'];
				$list[$i]['project_id'] = $row['project_id'];
				$list[$i]['keyword'] = $row['keyword'];
				$list[$i]['backlog'] = $row['backlog'];
				$list[$i]['priority'] = $row['priority'];
				$list[$i]['status'] = $row['status'];
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