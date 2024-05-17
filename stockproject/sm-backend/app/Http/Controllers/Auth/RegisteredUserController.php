<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class RegisteredUserController extends Controller
{
    public function register(Request $request)
    {
        // Create a new user instance
        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->password =$request->password ;
        $user->phone = $request->phone;
        $result=$user->save();

        if($result){
            return "sign up successful";
        }else{
            return "has not sign up";
        }
    }
}
