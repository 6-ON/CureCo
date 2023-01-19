<?php
use CureCo\models\User;
use sixon\hwFramework\Application;



require_once __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

$config = [
    'userClass' => User::class,
    'db' => [
        'dsn' => $_ENV['DB_DSN'],
        'usr' => $_ENV['DB_USR'],
        'psd' => $_ENV['DB_PSD'],

    ]
];
$app = new Application(dirname(__DIR__), $config);


$user = new User();
$user->loadData([
    'email'=>'test@test.t',
    'username'=>'tester',
    'password' => '1234',
]);
if ($user->validate() && $user->save()){
    echo 'success';
}
else{
    echo '<pre>';
    var_dump($user->errors);
    echo '</pre>';
    exit;
}