export default () => ({
    isLoading: true,
    entry: [
        {
            id: new Date().getTime(),
            date: new Date().toDateString(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quos natus reprehenderit ut molestiae odit fugit at sunt eum quidem nesciunt nisi ipsam delectus in, voluptatibus quam perspiciatis cumque recusandae.',
            picture: null
        },
        {
            id: new Date().getTime() + 1000,
            date: new Date().toDateString(),
            text: 'odit fugit at sunt eum quidem nesciunt nisi ipsam delectus in, voluptatibus quam perspiciatis cumque recusandae.',
            picture: null
        },
        {
            id: new Date().getTime() + 2000,
            date: new Date().toDateString(),
            text: 'asdddd llasodoiwd asuidauiiuhfuiahsiu skj sn suqs odit fugit at sunt eum quidem nesciunt nisi ipsam delectus in, voluptatibus quam perspiciatis cumque recusandae.',
            picture: null
        }
    ]
})