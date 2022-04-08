const chai = require('chai')
const request = chai.request
const expect = chai.expect
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../index')

chai.use(chaiHttp)

describe('homepage', () => {
    it('should GET login page', (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
            res.should.to.be.html;
            done();
        })
    })
})

describe('login', () => {
    it('should GET login page', (done) => {
        chai.request(server)
            .get("/login")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            })
    })
    it('should POST regular user login', (done) => {~
        chai.request(server)
            .post("/login")
            .send({'email':'tester@gmail.com', 'password':'testing1'})
            .redirects(0)
            .end((err,res) => {
                res.should.have.status(302);
                res.should.redirectTo("/");
                done();
            }) 
    })
    it('should POST admin user login', (done) => {
        chai.request(server)
            .post("/login")
            .send({'email':'peterpark@gmail.com', 'password':'peterpark'})
            .redirects(0)
            .end((err,res) => {
                res.should.have.status(302);
                res.should.redirectTo("/");
                done();
            }) 
    })
    it('should fail POST admin user login', (done) => {
        chai.request(server)
            .post("/login")
            .send({'email':'peterpark@gmail.com', 'password':'pedterpark'})
            .redirects(0)
            .end((err,res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            }) 
    })
})

describe('meeting', () => {
    it('should GET meeting page', (done) => {
        chai.request(server)
            .get("/meeting")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            })
    })
    it('should GET meeting code page', (done) => {
        chai.request(server)
            .get("/meeting/code")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            })
    })
    it('should GET a unique meeting room page', (done) => {
        chai.request(server)
            .get('/meeting/room/:room')
            .end((err,res) => {
                res.should.have.status(200);
                res.should.to.be.html;
                done();
            })
    })
})

describe('donate', () => {
    it('should GET donation page', (done) => {
        chai.request(server)
            .get("/donate")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
    it('should redirect to login page when unregistered', (done) => {
        chai.request(server)
            .get("/transactions")
            .end((err, res) => {
                res.should.be.html;
                res.should.have.status(200);
                done();
            })
    })
})