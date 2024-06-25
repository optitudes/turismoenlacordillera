<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 
use Illuminate\Support\Facades\DB;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasFactory, Notifiable,HasApiTokens ;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
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

    public function profile(){
        return $this->hasOne(Profile::class,'userId');
    }

    public function role(){
        return $this->belongsTo(Role::class,'role_id');
    }



    public static function getAdminsEmails(){
        return DB::table('users', 'user')
                    ->where('user.deleted_at', null)
                    ->join('roles as rol', 'rol.id', '=', 'user.role_id')
                    ->where('rol.code',"1001")
                    ->pluck('user.email')
                    ->toArray();
    }
}
