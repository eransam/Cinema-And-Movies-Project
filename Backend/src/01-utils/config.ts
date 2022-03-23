class Config {

}

class DevelopmentConfig extends Config {
    public isDevelopment = true;
    public mysql = { host: "localhost", user: "root", password: "", database: "MoviesDB" };
}

class ProductionConfig extends Config {
    public isDevelopment = false;
    public mysql = { host: "eu-cdbr-west-02.cleardb.net", user: "B6e77e9e58cdc4", password: "92e35402", database: "heroku_083bd8aabd2cc00" };
}

const config = process.env.NODE_ENV === "production" ? new ProductionConfig() : new DevelopmentConfig();

export default config;
