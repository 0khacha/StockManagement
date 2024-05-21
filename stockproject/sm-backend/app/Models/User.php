<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // Import the HasApiTokens trait

class User extends Authenticatable
{
    use HasApiTokens, Notifiable; // Add HasApiTokens trait to the list of traits used by the model

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['first_name','last_name', 'email', 'password','phone_number','image']; // Replace with specific fields you allow mass assignment for/ Replace with specific fields you allow mass assignment for

    protected $table = 'users';
    // Define user role constants (optional, uncomment if using)
    // const ROLE_USER = 'user';
    // const ROLE_ADMIN = 'admin';

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function getProfilePhotoUrlAttribute()
    {
        // Implement logic to return the actual URL of the user's profile photo
        // This might involve accessing a database field, a separate storage system, or a default placeholder
        return 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'; // Example placeholder
    }
}
