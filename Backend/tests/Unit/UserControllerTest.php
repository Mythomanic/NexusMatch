<?php

namespace Tests\Unit\Api;

use Tests\TestCase;
use App\Models\User;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase; // Add the RefreshDatabase trait

    /**
     * Set up the test environment.
     */
    public function setUp(): void
    {
        parent::setUp();

        // No need to create or authenticate a user for each test
        // as RefreshDatabase trait handles database transactions
    }

    /**
     * Test creating a new user.
     *
     * @return void
     */
    public function testCreateUser()
    {
        $request = new Request([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $userController = new UserController();
        $response = $userController->create($request);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ]);
    }

    /**
     * Test showing a specific user.
     *
     * @return void
     */
    public function testShowUser()
    {
        $user = User::factory()->create();

        $userController = new UserController();
        $response = $userController->show($user->id);

        $this->assertEquals(200, $response->status());
    }

    /**
     * Test editing a user.
     *
     * @return void
     */
    public function testEditUser()
    {
        $user = User::factory()->create();

        $request = new Request([
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
            'password' => 'updatedpassword',
            'password_confirmation' => 'updatedpassword',
        ]);

        $userController = new UserController();
        $response = $userController->edit($request, $user->id);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseHas('users', [
            'name' => 'Updated Name',
            'email' => 'updated@example.com',
        ]);
    }

    /**
     * Test destroying a user.
     *
     * @return void
     */
    public function testDestroyUser()
    {
        $user = User::factory()->create();

        $userController = new UserController();
        $response = $userController->destroy($user->id);

        $this->assertEquals(200, $response->status());
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    /**
     * Test user login.
     *
     * @return void
     */
    public function testUserLogin()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password123'),
        ]);

        $request = new Request([
            'email' => $user->email,
            'password' => 'password123',
        ]);

        $userController = new UserController();
        $response = $userController->login($request);

        $content = json_decode($response->getContent(), true);

        $this->assertEquals(200, $response->status());
        $this->assertArrayHasKey('token', $content);
    }
}
