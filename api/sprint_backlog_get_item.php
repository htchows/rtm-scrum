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
		
		$sql='';
		$sql = "SELECT * 
				FROM sprint_backlog 
				WHERE `project_id`='$prj_id' 
				AND `pb_id`='$pb_id'  
				AND `sb_id`='$sb_id' 
				AND `sb_item_id`='$sb_item_id'";
		$list = [];

		if($result = mysqli_query($con,$sql))
		{
			$i = 0;
			while($row = mysqli_fetch_assoc($result))
			{
				$list[$i]['project_id'] = $row['project_id'];
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