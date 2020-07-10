from flask import Flask, redirect, url_for, render_template, request, session, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy

app = Flask("__main__")
app.secret_key = "8173465983174"
app.config["SQLALCHEMY_DATABASE_URI"] = 'sqlite:///users.sqlite3'
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["EXPLAIN_TEMPLATE_LOADING"] = True

data = SQLAlchemy(app)

class users(data.Model):
    _id = data.Column("id", data.Integer, primary_key=True)
    name = data.Column("name", data.String(20))
    win = data.Column("wins", data.Integer)
    money = data.Column(data.Integer)

    def __init__(self, name, win, money):
      self.name = name
      self.win = win
      self.money = money


@app.route("/", methods = ["POST", "GET"])
def start():
  if "user" in session:
    return render_template("index.html")
  else:
    return redirect(url_for("login"))
  #return render_template("login.html")

@app.route("/login", methods = ["POST", "GET"])
def login():
  if request.method == "POST":
    user = request.form["nm"]
    session["user"] = user

    found_usr = users.query.filter_by(name = user).first()
    if found_usr:
      session["win"] = found_usr.win
      session["money"] = found_usr.money
    else:
      usr = users(user, 0, 500)
      data.session.add(usr)
      data.session.commit()

    return redirect(url_for("user"))
  else:
    if "user" in session:
      return redirect(url_for("user"))
    return render_template("/blackjack/templates/login.html")

@app.route("/user")
def user():
  if "user" in session:
    user = session["user"]
    return redirect(url_for("start"))
  else:
    return redirect(url_for("login"))

@app.route("/logout")
def logout():
  session.pop("user", None)
  session.pop("win", None)
  session.pop("money", None)
  return redirect(url_for("login"))

@app.route("/stats", methods=["POST", "GET"])
def stats():
  win = None
  money = None
  if "user" in session:
    user = session["user"]

    found_usr = users.query.filter_by(name = user).first()
    session["win"] = found_usr.win
    session["money"] = found_usr.money

    if request.method == "POST":
      win = session["win"]
      money = session["money"]
    else:
      if "win" in session:
        win = session["win"]
      if "money" in session:
        money = session["money"]

    return render_template("stats.html", username = session["user"], wins = win, money = money)

  else:
    return redirect(url_for("login"))

@app.route("/view")
def view():
  return render_template("view.html", values=users.query.all())


@app.route("/blackjack")
def game():
  return render_template("game.html")

@app.route("/blackjack/update", methods=["POST"])
def update():
  user = session["user"]
  found_user = users.query.filter_by(name=user).first()
  bal = found_user.money
  


  req = request.get_json()

  res = make_response(jsonify({"message":bal}), 200)

  return res


@app.route("/blackjack/numbers", methods=["POST"])
def numbers():
  req = request.get_json()

  res = make_response(jsonify({"message":"JSON received"}), 200)

  user = session["user"]
  found_user = users.query.filter_by(name=user).first()
  found_user.win = req["wins"]
  found_user.money = req["money"]
  data.session.commit()

  return res


@app.route("/admin")
def admin():

  #print(data.session.query("name").all())

  users.query.delete()
  data.session.commit()

  return redirect(url_for("start"))


if __name__ == "__main__":
  data.create_all()
  app.run(debug = True)
