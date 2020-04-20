<?php
	include_once("database.php");
	$postdata = file_get_contents("php://input");
	$request = json_decode($postdata);
	
	if(isset($postdata) && !empty($postdata))
	{
		$prj_id = mysqli_real_escape_string($con, trim($request->prj_id));
		$user = $request->email;
		$sql='';
		
		$sql = "INSERT INTO `project_viewer`(`project_id`, `user_id`) VALUES ";
		
		if(count($user) > 0){
			for($i = 0; $i<count($user); $i++){
				if($i != count($user) -1 ){
					$sql .= "('{$prj_id}','{$user[$i]}'),";
				}
				else{
					$sql .= "('{$prj_id}','{$user[$i]}')";
				}
			}
		}
		$list = [];
		if (mysqli_query($con,$sql)) {
			echo json_encode("added"); 
		}
		else {
		  http_response_code(404);
		}
	}
?>