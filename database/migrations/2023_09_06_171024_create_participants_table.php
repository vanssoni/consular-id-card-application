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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->string('uid')->unique();
            $table->string('first_name');
            $table->string('last_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('email')->nullable();
            $table->date('dob')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->string('state_of_origin')->nullable();
            $table->string('local_government_area')->nullable();
            $table->string('town')->nullable();
            $table->string('nigeria_address')->nullable();
            $table->string('nigeria_telephone', 20)->nullable();
            $table->string('profession')->nullable();
            $table->string('passport_number')->nullable();
            $table->string('name_of_next_of_kin_in_nigeria')->nullable();
            $table->string('address_of_next_of_kin_in_nigeria')->nullable();
            $table->string('telephone_of_next_of_kin_in_nigeria', 20)->nullable();
            $table->date('date_of_arrival_in_guinea')->nullable();
            $table->string('guinea_address')->nullable();
            $table->string('guinea_telephone',20)->nullable();
            $table->string('name_of_next_of_kin_in_guinea')->nullable();
            $table->string('address_of_next_of_kin_in_guinea')->nullable();
            $table->string('telephone_of_next_of_kin_in_guinea')->nullable();
            $table->string('card_number')->nullable();
            $table->date('issue_date')->nullable();
            $table->date('card_expiry_date')->nullable();
            $table->string('applicant_picture')->nullable();
            $table->string('applicant_signature')->nullable();
            $table->longText('comments')->nullable();
            $table->string('qr_code')->nullable();
            $table->dateTime('last_verified_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
