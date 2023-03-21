const request = require('supertest')
const app = require('../app/app')

describe('User controller testing', () => {
    describe('Register', () => {
        test('Should return status code 200 if all is fine', () => {
            jest.setTimeout(async () => {
                const res = await request(app).post('/register').send({
                    login: "Jan",
                    email: "jan@jan.pl",
                    password: "12345",
                    cPassword: "12345"
                })
                expect(res.body).toHaveProperty('false')
            }, 60000);
        })
    })
})
/*
describe('User controller testing', () => {
    describe('Register', () => {
        it('All is fine return status code 200', () => {
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    email: "jan@jan.pl",
                    password: "12345",
                    cPassword: "12345"
                    }
                }
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.register(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith('cos tam')
            
            }, 60000);
        })

        it('All is fine return validation status true', () => {
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    email: "jan@jan.pl",
                    password: "12345",
                    cPassword: "12345"
                    }
                }
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.register(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith(true)
            
            }, 60000);
        })

        it('Passwords are not the same status code 400', () => {
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    email: "jan@jan.pl",
                    password: "12345",
                    cPassword: "12345"
                    }
                }

                const mRes = {}
                const mNext = jest.fn()
                await UserActions.register(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith(400)


            }, 60000)
        })

        it('User already exist', () => {
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan123",
                    email: "jan@jan.pl",
                    password: "12345",
                    cPassword: "12345"
                    }
                }
                const user = new User(mReq.body)
                await user.save()
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.register(mReq, mRes, mNext)
                expect(mNext).toBe('This user already has an account with this login')
                await User.deleteOne({login: 'Jan123'})
            }, 60000)
        })
    })

    describe('Login', ()=>{
        it('All is fine return status code 200', ()=>{
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    password: "12345"
                    }
                }
                const user = new User(mReq.body)
                await user.save()
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.login(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith(200)
                await User.deleteOne({login: 'Jan'})
            }, 60000);
        })

        it('All is fine return validation status true', ()=>{
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    password: "12345"
                    }
                }
                const user = new User(mReq.body)
                await user.save()
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.login(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith(true)
                await User.deleteOne({login: 'Jan'})
            }, 60000);
        })

        it('All is fine return user login', ()=>{
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    password: "12345"
                    }
                }
                const user = new User(mReq.body)
                await user.save()
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.login(mReq, mRes, mNext)
                expect(mNext).toBeCalledWith("Jan")
                await User.deleteOne({login: 'Jan'})
            }, 60000);
        })

        it('Cant find this user', ()=>{
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "No existing user",
                    password: "12345"
                    }
                }
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.login(mReq, mRes, mNext)
                expect(mNext).toBe("This user doesn't exist")
            }, 60000);
        })

        it('Wrong passowrd', ()=>{
            jest.setTimeout(async () => {
                const mReq = {body: {
                    login: "Jan",
                    password: "1234"
                    }
                }
                const user = new User({
                    login: "Jan",
                    password: "12345"
                })
                await user.save()
                const mRes = {}
                const mNext = jest.fn()
                await UserActions.login(mReq, mRes, mNext)
                expect(mNext).toBe('Wrong password')
                await User.deleteOne({login: 'Jan'})
            }, 60000);
        })
    })
})
*/