from config import db
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase, relationship
from sqlalchemy import String, Integer, Boolean, ForeignKey, Text
from werkzeug.security import check_password_hash



# Database Models

class Artisan(db.Model):
    __tablename__ = "artisan"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(40), nullable=False, unique=True)
    name: Mapped[str] = mapped_column(String(50), nullable=False, unique=True)
    tel: Mapped[int] = mapped_column(Integer, nullable=False)
    password: Mapped[str] = mapped_column(String(100), nullable=False)
    verified: Mapped[bool] = mapped_column(Boolean, nullable=True)

    # relationship between artisan and product
    product: Mapped[int] = relationship("Product", back_populates="artisan_product", cascade="all, delete-orphan")

    def check_password(self, password):
        if check_password_hash(self.password, password):
            return True
        return False

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

    # relationship between customer and product
    customer: Mapped[int] = relationship("Customer", back_populates="customer")

    # converts model to json python dictionary format easily convertible to json
    def to_json(self):
        customer = {}

        for column in self.___table___.columns():
            customer[column.name] = getattr(self, column.name)

        return customer

    def __str__(self):
        return self.name
    

class Product(db.Model):
    __tablename__ = "product"

    prod_id: Mapped[int] = mapped_column(Integer, primary_key=True)
    prod_name: Mapped[str] = mapped_column(String(40), nullable=False)
    prod_price: Mapped[int] = mapped_column(Integer, nullable=False)
    prod_description: Mapped[str] = mapped_column(Text, nullable=False)

    # relationship between artisan and product
    artsian_id: Mapped[int] = mapped_column(Integer, ForeignKey('artisan.id'), nullable=False)
    artisan_product: Mapped[int] = relationship("Artisan", back_populates="product")

    # relationship between customer and product
    customer_id: Mapped[int] = mapped_column(Integer, ForeignKey('customer.id'), nullable=True)
    customer: Mapped[int] = relationship("Customer", back_populates="product")


    def to_json(self):
        product= {}

        for column in self.___table___.columns():
            product[column.name] = getattr(self, column.name)

        return product

    def __str__(self):
        return self.prod_name