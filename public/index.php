<?php


use CureCo\controllers\AuthController;
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

$app->router->get('/', [AuthController::class, 'login']);
$app->router->get('/login', [AuthController::class, 'login']);
$app->router->get('/dashboard', [AuthController::class, 'dashboard']);
$app->router->get('/api/products/get', [AuthController::class, 'getProducts']);



// Product options
$app->router->post('/api/products/get', [AuthController::class, 'getProducts']);
$app->router->post('/api/products/update', [AuthController::class, 'productUpdate']);
$app->router->post('/api/products/create', [AuthController::class, 'productCreate']);
$app->router->post('/api/products/delete', [AuthController::class, 'productDelete']);
// Auth Options
$app->router->post('/', [AuthController::class, 'login']);
$app->router->post('/login', [AuthController::class, 'login']);
$app->router->post('/dashboard', [AuthController::class, 'dashboard']);


$app->run();

