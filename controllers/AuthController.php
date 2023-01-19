<?php

namespace CureCo\controllers;

use CureCo\models\Product;
use sixon\hwFramework\Application;
use sixon\hwFramework\Controller;
use sixon\hwFramework\Request;
use sixon\hwFramework\Response;

class AuthController extends Controller
{

    public function uploadFile(array $source, string $target)
    {
        if ($source['error'] == 0) {
            move_uploaded_file($source['tmp_name'], Application::$ROOT_DIR . '/public/img/products/' . $target);
        }
    }

    public function login(Request $request, Response $response)
    {
        $this->setLayout('empty');
        if ($request->isGet()) {
            return $this->render('login');
        } else {
            $response->redirect('/dashboard');
        }
    }

    public function dashboard(Request $request, Response $response)
    {
        if ($request->isGet()) {
            return $this->render('dashboard');
        }
    }

    public function getProducts(Request $request, Response $response): false|string
    {
        $response->setContentType(Response::TYPE_JSON);
        $id = $request->getBody()['id'] ?? false;
        if ($id) {
            return json_encode(Product::findOne(['id' => $id]));
        } else {
            $term = $request->getBody()['term'] ?? false;
            if($term){
                return  json_encode(Product::search($term));
            }
            return json_encode(Product::getAll());
        }

    }

    public function productUpdate(Request $request, Response $response): string|false
    {

        $response->setContentType(Response::TYPE_JSON);
        try {
            $id = $request->getBody()['id'] ?? throw new \Exception();
            $params = $request->getBody();
            unset($params['id']);
            $image = $request->getFiles()['image'] ?? false;
            if ($image) {
                $params['image'] = sprintf("prod-%s.png", $id);
                $this->uploadFile($image, $params['image']);
            }
            Product::update($params, ['id' => $id]);
            return json_encode($this->makeMessage('success', 'the product was updated successfully'));
        } catch (\Exception) {
            return json_encode($this->makeMessage('error', 'there was an error while updating !'));
        }

    }

    public function makeMessage($type, $content): array
    {
        return ['type' => $type ,'content' => $content];
    }



}