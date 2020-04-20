<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$email = $request->email;
		
		$sql='';
		$sql = "SELECT id 
				FROM `user` 
				WHERE email = '$email[0]' ";
		
		if(count($email) > 1){
			for($i = 1; $i<count($email); $i++){
				$sql .= " OR email = '$email[$i]'";
			}
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