<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$id = mysqli_real_escape_string($con, $request);
		$sql='';
		$sql = "SELECT * FROM product_backlog where project_id='$id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['prj_id'] = $row['project_id'];
				$list[$i]['pbid'] = $row['id'];
				$list[$i]['pb_id'] = $row['pb_id'];
				$list[$i]['desc'] = $row['pb_desc'];
				$list[$i]['priority'] = $row['pb_priority'];
				$list[$i]['status'] = $row['pb_status'];
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