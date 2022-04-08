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

describe('database', () => {
    it('should GET database page', (done) => {
        chai.request(server)
            .get("/database")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
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

describe('logout', () => {
    it('should GET logout redirection', (done) => {~
        chai.request(server)
            .get("/logout")
            .redirects(0)
            .end((err,res) => {
                res.should.have.status(302);
                res.should.redirectTo("/");
                done();
            }) 
    })
})

describe('signup', () => {
    it('should GET signup page', (done) => {
        chai.request(server)
            .get("/signup")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
    it('should reject invalid input', (done) => {
        chai.request(server)
            .get("/signup")
            .send({'email':'notanemail', 'password':'bad'})
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
    it('should finish signup after input', (done) => {
        chai.request(server)
            .post("/signup")
            .end((err, res) => {
                res.should.be.string;
                res.should.have.status(200);
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
    it('should GET a unique meeting room page and redirect to login', (done) => {
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
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
})

describe('roombooking', () => {
    it('should GET roombooking page', (done) => {
        chai.request(server)
            .get("/roombooking")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
})

describe('contact', () => {
    it('should GET contact page', (done) => {
        chai.request(server)
            .get("/contact")
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            })
    })
})

describe('account', () => {
    it('should GET account page', (done) => {
        chai.request(server)
            .get("/account")
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            }) 
    })
    it('should POST account page to redirect to account page', (done) => {
        chai.request(server)
        .post("/account")
        .redirects(0)
        .end((err,res) => {
            res.should.have.status(302);
            res.should.redirectTo("/account");
            done();
        }) 
    })
    it('should POST account page to redirect to edit page', (done) => {
        chai.request(server)
        .post("/account")
        .send({button: "edit"})
        .redirects(0)
        .end((err,res) => {
            res.should.have.status(302);
            res.should.redirectTo("/account/edit");
            done();
        }) 
    })
    it('should GET account edit page', (done) => {
        chai.request(server)
            .get("/account/edit")
            .end((err,res) => {
                res.should.have.status(200);
                res.should.be.html;
                done();
            }) 
    })
})