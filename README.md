
Loopback-schema-checker
==========================

model schema checker for compatibility between model files and working remote/local mongo

### Install

```sh
$ npm install loopback-schema-checker -g
```

### Usage

```sh
$ lsc ./path/to/your/loopback/project [mongodb://mongourl]
```

Then you will get report like these lines below:

```txt
o <UserCredential> skip the mode WeflexUserCredential
o <Analytics> skip the mode Analytics
o <App> skip the mode WeflexApp
o <Product> skip the mode Product
- <Class> from should be type(date)
- <Class> to should be type(date)
o <Class> skip the check for spots
o <Class> skip the check for properties
- <Class> text should be type(array)
o <Reviewer> skip the mode Reviewer
o <Venue> skip the check for photos
- <Venue> phone should be type(string)
o <Venue> skip the check for tags
o <Venue> skip the check for amenities
- <Order> _id is required now
- <Order> _id should be type(string)
- <Order> errormsg should be type(string)
- <Order> created should be type(date)
- <User> sex should be type(number)
- <User> province should be type(string)
- <User> city should be type(string)
- <User> country should be type(string)
- <User> avatarUrl should be type(string)
- <User> phone should be type(string)
```

Then:

- `-` line means error, so you need to fix it
- `o` line means warning, so you just would better to take it

### License

MIT
