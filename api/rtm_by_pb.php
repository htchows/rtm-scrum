<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$pb_id = $request->pb_id;
		
		$sql='';
		
			$sql = "SELECT pb.project_id, pb.pb_id, pb.pb_desc, pb.pb_priority, pb.pb_status, 
						   sb.sb_id, sb.sb_item_id, sb.sb_desc, sb.sb_priority, sb.sb_status 
					FROM `product_backlog` AS pb
					LEFT JOIN sprint_backlog AS sb
					ON sb.pb_id = pb.id
					AND sb.project_id = pb.project_id
					WHERE sb.project_id = '$prj_id'
					AND sb.pb_id = '$pb_id[0]' OR pb.id = '$pb_id[0]' ";
		
		if(count($pb_id) > 1){
			for($i = 1; $i<count($pb_id); $i++){
				$sql .= " OR sb.pb_id = '$pb_id[$i]' OR pb.id = '$pb_id[$i]'";
			}
		}
		
		$sql .= " ORDER BY pb.pb_id";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['project_id'] = $row['project_id'];
				$list[$i]['pb_id']= $row['pb_id'];
				$list[$i]['pb_desc']= $row['pb_desc'];
				$list[$i]['pb_priority'] = $row['pb_priority'];
				$list[$i]['pb_status'] = $row['pb_status'];
				$list[$i]['sb_id'] = $row['sb_id'];
				$list[$i]['sb_item_id'] = $row['sb_item_id'];
				$list[$i]['sb_desc'] = $row['sb_desc'];
				$list[$i]['sb_priority'] = $row['sb_priority'];
				$list[$i]['sb_status'] = $row['sb_status'];
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