<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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
