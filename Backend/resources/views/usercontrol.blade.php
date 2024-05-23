<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>

    <h1>Profil</h1>
    @if(session('success'))
        <p>{{ session('success') }}</p>
    @endif
    
    @if($user->avatar)
        <img src="{{ asset('storage/avatars/' . $user->avatar) }}" alt="Profile Picture">
    @endif
    

    <form action="{{ route('profile.update') }}" method="POST" enctype="multipart/form-data">
        @csrf
        @method('PUT')
        <div>
            <label for="avatar">Profile Picture</label>
            <input type="file" name="avatar" id="avatar">
        </div>
        <button type="submit">Update Profile</button>
    </form>

</body>
</html>