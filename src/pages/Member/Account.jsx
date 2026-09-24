export default function Account() {
  return (
    <>
      <div class="col-sm-9">
        <div class="blog-post-area">
          <h2 class="title text-center">Update user</h2>
          <div class="signup-form">
            <h2>New User Signup!</h2>
            <form action="#">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email Address" />
              <input type="password" placeholder="Password" />
              <button type="submit" class="btn btn-default">
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
