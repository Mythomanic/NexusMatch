<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatarDate')->nullable()->default('defaultpp');
            $table->string('tagsDate')->nullable();
            $table->string('descriptionDate')->nullable()->default('my description');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('avatarDate');
            $table->dropColumn('descriptionDate');
            $table->dropColumn('tagsDate');
        });
    }
};
