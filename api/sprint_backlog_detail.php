<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$sb_id = mysqli_real_escape_string($con, trim($request->sb_id));
		
		$sql='';
		$sql = "SELECT pb.id AS pbid, pb.pb_id, sb.project_id, sb.id AS sbid, sb.sb_id, sb.sb_item_id, sb.sb_desc, sb.sb_priority,sb.sb_priority, sb.sb_status 
				FROM `sprint_backlog` AS sb
				INNER JOIN product_backlog AS pb
				ON sb.pb_id = pb.id
				AND sb.project_id = pb.project_id
				WHERE sb.project_id = '$prj_id'
				AND sb.sb_id = '$sb_id' ";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['sbid'] = $row['sbid'];
				$list[$i]['pbid'] = $row['pbid'];
				$list[$i]['prj_id'] = $row['project_id'];
				$list[$i]['pb_id'] = $row['pb_id'];
				$list[$i]['sb_id'] = $row['sb_id'];
				$list[$i]['sb_item_id'] = $row['sb_item_id'];
				$list[$i]['desc'] = $row['sb_desc'];
				$list[$i]['priority'] = $row['sb_priority'];
				$list[$i]['status'] = $row['sb_status'];
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