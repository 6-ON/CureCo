<?php

namespace CureCo\models;

use sixon\hwFramework\db\DbModel;

class LoginForm extends DbModel
{

    public static function tableName(): string
    {
        return  'users';
    }

    public function attributes(): array
    {
        return ['email','password'];
    }

    public static function primaryKey(): string
    {
        return 'id';
    }

    public function rules(): array
    {
        return [
            'email'=>[self::RULE_REQUIRED],
            'password' =>[self::RULE_REQUIRED]
        ];
    }

    public function labels(): array
    {
        return [];
    }
}