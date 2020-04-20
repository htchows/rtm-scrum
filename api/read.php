<?php
/**
 * Returns the list of policies.
 */
require 'database.php';

$policies = [];
$sql = "SELECT id, username, email FROM user";

if($result = mysqli_query($con,$sql))
{
  $i = 0;
  while($row = mysqli_fetch_assoc($result))
  {
    $policies[$i]['id']    = $row['id'];
    $policies[$i]['username'] = $row['username'];
    $policies[$i]['email'] = $row['email'];
    $i++;
  }

  echo json_encode($policies);
}
else
{
  http_response_code(404);
}

?>