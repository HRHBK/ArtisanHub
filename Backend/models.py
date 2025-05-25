from config import db
from sqlalchemy.orm import Mapped, mapped_column, DeclerativeBase
from sqlalchemy import String, Integer, Boolean

# Database Models

class Artisan(db.Model):
    __tablename__ = "artisan"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(40), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, nullable=True)

    def to_json(self):

        artisan = {}

        for column in self.___table___.columns():
            artisan[column.name] = getattr(self, column.name)

        return artisan
    
    def __str__(self):
        return self.name
    
class Customer(db.Model):
    __tablename__ = "customer"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[int] = mapped_column(String(40), unique=True)
    name: Mapped[str] = mapped_column(String(50), unique=True)
    tel: Mapped[int] = mapped_column(Integer,nullable=False, unique=True)


    # converts model to json python dictionary format easily convertible to json
    def to_json(self):

        artisan = {}

        for column in self.___table___.columns():
            artisan[column.name] = getattr(self, column.name)

        return artisan


    def __str__(self):
        return self.name