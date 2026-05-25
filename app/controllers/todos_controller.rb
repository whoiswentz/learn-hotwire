class TodosController < ApplicationController
  def index
    @pagy, @todos = pagy(:keyset, Current.user.todos)
  end
end
