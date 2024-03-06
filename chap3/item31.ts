{
  // 숫자들의 최솟값과 최댓값을 계산하는 extent 함수
  {
    function extent(nums: number[]) {
      let min, max;

      for (const num of nums) {
        if (!min) {
          min = num;
          max = num;
        } else {
          min = Math.min(min, num);
          max = Math.max(max, num);
        }
      }

      return [min, max];
    }

    const [min, max] = extent([0, 1, 2]);
    const span = max - min;
  }

  // extent 함수: 더 나은 해법
  {
    function extent(nums: number[]) {
      let result: [number, number] | null = null;

      for (const num of nums) {
        if (!result) {
          result = [num, num];
        } else {
          result = [Math.min(num, result[0]), Math.max(num, result[1])];
        }
      }
      return result;
    }

    // ! 단언문 사용
    const [min, max] = extent([0, 1, 2])!;
    const span = max - min;

    // if 구문
    const range = extent([0, 1, 2]);
    if (range) {
      const [min, max] = range;
      const span = max - min;
    }
  }

  // null과 null이 아닌 값을 섞어서 클래스에서 사용할 때
  // 사용자와 사용자의 포럼 게시글을 나타내는 클래스
  {
    type UserInfo = {
      name: string;
    };
    type Post = {};
    const fetchUser = (userId: string) =>
      Promise.resolve<UserInfo>({ name: "User" });
    const fetchPostsForUser = (userId: string) => Promise.resolve<Post[]>([]);

    // 개선 전
    {
      class UserPosts {
        user: UserInfo | null;
        posts: Post[] | null;

        constructor() {
          this.user = null;
          this.posts = null;
        }

        // 두 번의 네트워크 요청이 로드되는 동안, user, posts 속성은 null 상태
        // CASES
        // 둘 다 null, 둘 중 하나만 null, 둘 다 null이 아닐 것
        async init(userId: string) {
          return Promise.all([
            async () => (this.user = await fetchUser(userId)),
            async () => (this.posts = await fetchPostsForUser(userId)),
          ]);
        }

        getUserName() {
          // ???
        }
      }
    }

    // 개선 후,
    {
      class UserPosts {
        user: UserInfo;
        posts: Post[];

        constructor(user: UserInfo, posts: Post[]) {
          this.user = user;
          this.posts = posts;
        }

        static async init(userId: string): Promise<UserPosts> {
          const [user, posts] = await Promise.all([
            fetchUser(userId),
            fetchPostsForUser(userId),
          ]);
          return new UserPosts(user, posts);
        }

        getUserName() {
          return this.user.name;
        }
      }

      async () => {
        const userPosts = await UserPosts.init("user-id");
        const userPosts2 = new UserPosts({ name: "User" }, []);
      };
    }
  }
}
