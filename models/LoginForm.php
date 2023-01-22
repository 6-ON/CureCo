<?php

namespace CureCo\models;

use sixon\hwFramework\Application;
use sixon\hwFramework\db\DbModel;

class LoginForm extends DbModel
{

    public $email;
    public $password;

    public static function tableName(): string
    {
        return 'users';
    }

    public function attributes(): array
    {
        return ['email', 'password'];
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function rules(): array
    {
        return [
            'email' => [self::RULE_REQUIRED],
            'password' => [self::RULE_REQUIRED]
        ];
    }

    public function labels(): array
    {
        return [];
    }

    public function login()
    {
        $user = User::findOne(['email'=>$this->email]);
        if (!$user){
            return false;
        }
        if (!password_verify($this->password, $user->password)) {
            return false;
        }
        return Application::$app->login($user);
    }
}