class TodosController < ApplicationController
  def index
    todos = Current.user.todos.includes(:project)
    @pagy, @todos = pagy(:keyset, todos)
  end
end
