<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'string|required|max:100',
            'last_name' => 'string|required|max:100',
            'email' => 'email|required|max:191|unique:users,email',
            'password' => 'required|min:8|max:100',
            'confirm_password' => 'required|same:password'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => 422,
                'validation_errors' => $validator->messages()
            ]);
        }
        else{
            $user = User::create([
                'name' => $request->first_name.' '.$request->last_name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);

            $token = $user->createToken($user->email.'_token')->plainTextToken;
            
            return response()->json([
                'status' => 200,
                'username' => $user->name,
                'token' => $token,
                'message' => 'Registered Successfully!'
            ]);

        }
    }
}
